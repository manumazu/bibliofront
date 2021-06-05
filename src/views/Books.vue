<template>
  <div class="container" v-if="shelfId">
    <div class="row">
        <div class="col-sm-15">
            <section v-if="errored">
                <p>Nous sommes désolés, ces informations ne sont pas disponibles pour le moment.
                Veuillez réessayer ultérieurement.</p>
            </section>
            <section v-else>

              <section v-if="loading"><p>Chargement...</p></section>
              <section v-else>
                <h1>Books in "{{ bookshelfName }}"</h1>
                <hr>
                <button type="button" class="btn btn-success btn-sm">Add Book</button>

                <div>
                  <b-tabs content-class="mt-3">
                    <b-tab v-for="(shelfs, index) in booksElem" :key="index"
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

                        <draggable :list="shelfs" :move="checkMove" tag="tbody">
                          <tr v-for="(books, index) in shelfs" :key="index">
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
                </div>
              </section>

            </section>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';

export default {
  display: 'Table',
  data() {
    return {
      shelfId: '',
      bookshelfName: null,
      booksElem: [],
      loading: true,
      errored: false,
    };
  },
  components: {
    draggable,
  },
  methods: {
    getListBooks(shelfId) {
      if (shelfId === undefined) {
        // force redirect to shelf selector
        this.$router.push('/');
      } else {
        const path = this.$auth.baseUrl.concat('/api/bookshelf?token=').concat(this.$auth.token).concat('&uuid=').concat(shelfId);
        axios.get(path)
          .then((res) => {
            // console.log(res.data.shelfInfos);
            this.bookshelfName = res.data.shelfInfos.arduino_name;
            this.booksElem = res.data.storedBooks;
            this.shelfId = shelfId;
            // console.log(this.booksElem[1][0][1].author);
          })
          .catch((error) => {
            console.error(error);
            this.errored = true;
            // set auth token to false force to load login form
            this.$auth.token = false;
          })
          .finally(() => {
            this.loading = false;
            // console.log(this.shelfId);
          });
      }
    },
    checkMove(e) {
      // window.console.log('Future index: '.concat(e.draggedContext.futureIndex));
      console.log(JSON.stringify(e.draggedContext));
    },
  },
  created() {
    // console.log(this.$route.params.shelf);
    this.getListBooks(this.$route.params.shelfId);
  },
};
</script>
