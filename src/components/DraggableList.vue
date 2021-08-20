<template>
  <b-tabs content-class="mt-3" v-model="tabIndex">
    <b-tab v-for="(shelfs, index) in elements" :key="index"
      :title="'Shelf '.concat(index)">

      <div class="progress">
        <div :id="'shelf_progress_'.concat(index)"
        class="progress-bar progress-bar-striped"
        role="progressbar" aria-valuemin="0"
        :style="progressValueWidth" :aria-valuenow="progressValue[currentShelf]"
        aria-valuemax="100">Fulfillment {{progressValue[currentShelf]}}%</div>
      </div>

      <button v-if="showButton"
      type="button"
      class="btn btn-sm"
      :class="classBtnSave"
      @click="saveOrder">Save order</button>

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col" style="width: 25%">Title</th>
            <th scope="col" style="width: 25%">Author</th>
            <th scope="col" style="width: 25%">Borrowed?</th>
            <th style="width: 25%"></th>
          </tr>
        </thead>

        <draggable
        :list="shelfs"
        :move="checkMove"
        @end="displayButtonSave"
        ghost-class="ghost"
        tag="tbody"
        handle=".handle">
          <tr v-for="(books, index2) in shelfs" :key="index2">
            <td v-if="books[1].title" colspan="4" class="book-content">
              <tr class="handle">
                <td style="width: 25%">{{ books[1].title }}</td>
                <td style="width: 25%">{{ books[1].author }}</td>
                <td style="width: 25%" v-if="books[1].borrowed == 1">Yes</td>
                <td style="width: 25%" v-else>No</td>
                <td style="width: 25%">
                  <div class="btn-group" role="group">
                    <button type="button" class="btn btn-warning btn-sm">Update</button>
                    <button type="button" class="btn btn-danger btn-sm">Delete</button>
                  </div>
                </td>
              </tr>
            </td>
            <td v-else colspan="4" class="separator"></td>
          </tr>
        </draggable>

      </table>

    </b-tab>
  </b-tabs>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';

export default {
  display: 'Table',
  props: {
    elements: {
      type: Object,
      default() {
        return {};
      },
    },
    stats: {
      type: Object,
      default() {
        return {};
      },
    },
    shelfId: {
      type: String,
      default: '',
    },
    maxColsShelf: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tabIndex: 0,
      showButton: false,
      classBtnSave: 'btn-warning',
      progressValue: [],
      progressValueWidth: null,
    };
  },
  created() {
    // init progress values when loading shelves
    this.progressValue[this.currentShelf] = this.stats[this.currentShelf].positionRate;
    this.progressValueWidth = 'width:'.concat(this.progressValue[this.currentShelf]).concat('%');
  },
  computed: {
    currentShelf() {
      return this.tabIndex + 1;
    },
  },
  watch: {
    tabIndex() {
      // update progress values when switching shelves
      if (this.progressValue[this.currentShelf] === undefined) {
        this.progressValue[this.currentShelf] = this.stats[this.currentShelf].positionRate;
      }
      this.progressValueWidth = 'width:'.concat(this.progressValue[this.currentShelf]).concat('%');
    },
  },
  components: {
    draggable,
  },
  methods: {
    checkMove(e) {
      // console.log('currentShelf', this.currentShelf);
      // window.console.log('Future index: '.concat(e.draggedContext.futureIndex));
      console.log(JSON.stringify(e.draggedContext));
    },
    displayButtonSave() {
      this.showButton = true;
      this.classBtnSave = 'btn-warning';
    },
    saveOrder() {
      const newList = this.elements[this.currentShelf];
      const bookIds = [];
      newList.forEach((item) => {
        if (item[1].id !== null) {
          bookIds.push(item[1].id);
        }
      });
      // console.log(bookIds);
      axios.post(this.$auth.baseUrl.concat('/api/sort'), {
        book_ids: bookIds,
        row: this.currentShelf,
        token: this.$auth.token,
        uuid: this.shelfId,
      })
        .then((result) => {
          this.updateProgressBar(result);
          this.classBtnSave = 'btn-success';
          setTimeout(() => { this.showButton = false; }, 1000); // hide button save
        })
        .catch((error) => {
          console.error(error.message);
          this.classBtnSave = 'btn-danger';
          // set auth token to false force to load login form
          this.$auth.token = false;
        });
      // console.log(JSON.stringify(this.elements[currentShelf]));
    },
    updateProgressBar(result) {
      // console.log('maxColsShelf', this.maxColsShelf);
      const fulfillement = result.data[result.data.length - 1].fulfillment;
      // update progress values with new data
      this.progressValue[this.currentShelf] = Math.round((fulfillement / this.maxColsShelf) * 100);
      this.progressValueWidth = 'width:'.concat(this.progressValue[this.currentShelf]).concat('%');
    },
  },
};
</script>

<style scoped>
.handle {
  width: 100%;
  display: inline-table;
  border-style:hidden;
  cursor: pointer;
}
.handle:hover {
  background-color: transparent;
}
.book-content {
  border:solid 1px lightgrey;
}
.separator {
  background-color: lavender;
  border:solid 1px lightgrey;
}
</style>
