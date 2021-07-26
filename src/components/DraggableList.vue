<template>
  <b-tabs content-class="mt-3" v-model="tabIndex">
    <b-tab v-for="(shelfs, index) in elements" :key="index"
      :title="'Shelf '.concat(index)">

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
    shelfId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tabIndex: null,
      showButton: false,
      classBtnSave: 'btn-warning',
    };
  },
  components: {
    draggable,
  },
  methods: {
    checkMove(e) {
      // window.console.log('Future index: '.concat(e.draggedContext.futureIndex));
      console.log(JSON.stringify(e.draggedContext));
    },
    displayButtonSave() {
      this.showButton = true;
      this.classBtnSave = 'btn-warning';
    },
    saveOrder() {
      const currentShelf = (this.tabIndex + 1);
      const newList = this.elements[currentShelf];
      const bookIds = [];
      newList.forEach((item) => {
        if (item[1].id !== null) {
          bookIds.push(item[1].id);
        }
      });
      // console.log(bookIds);
      axios.post(this.$auth.baseUrl.concat('/api/sort'), {
        book_ids: bookIds,
        row: currentShelf,
        token: this.$auth.token,
        uuid: this.shelfId,
      })
        .then(() => {
          this.classBtnSave = 'btn-success';
          setTimeout(() => { this.showButton = false; }, 1000); // hide button save
        })
        .catch((error) => {
          console.error(error);
          this.classBtnSave = 'btn-danger';
        });
      // console.log(JSON.stringify(this.elements[currentShelf]));
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
