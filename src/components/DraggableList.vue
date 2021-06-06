<template>
  <b-tabs content-class="mt-3" v-model="tabIndex">
    <b-tab v-for="(shelfs, index) in elements" :key="index"
      :title="'Shelf '.concat(index)">

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Borrowed?</th>
            <th></th>
          </tr>
        </thead>

        <draggable
        :list="shelfs"
        :move="checkMove"
        @end="saveOrder"
        ghost-class="ghost"
        tag="tbody">
          <tr v-for="(books, index2) in shelfs" :key="index2">
            <td>{{ books[1].title }}</td>
            <td>{{ books[1].author }}</td>
            <td v-if="books[1].borrowed == 1">Yes</td>
            <td v-else>No</td>
            <td>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-warning btn-sm">Update</button>
                <button type="button" class="btn btn-danger btn-sm">Delete</button>
              </div>
            </td>
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
    saveOrder() {
      const currentShelf = (this.tabIndex + 1);
      const newList = this.elements[currentShelf];
      const bookIds = [];
      newList.forEach((item) => {
        bookIds.push(item[0]);
      });
      console.log(bookIds);
      axios.post(this.$auth.baseUrl.concat('/api/sort'), {
        book_ids: bookIds,
        row: currentShelf,
        token: this.$auth.token,
        uuid: this.shelfId,
      });
      // console.log(JSON.stringify(this.elements[currentShelf]));
    },
  },
};
</script>
