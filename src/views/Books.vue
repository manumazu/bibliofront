<template>
  <div class="container" v-if="shelfId">
    <div class="row">
        <div class="col-sm-15">
            <section v-if="errored">
                <p>Nous sommes désolés, ces informations ne sont pas disponibles pour le moment.
                Veuillez réessayer ultérieurement.</p>
            </section>

            <p v-if="loading">Chargement...</p>
            <section v-else>
              <h1>Books in "{{ bookshelfName }}"</h1>
              <hr>
              <button type="button"
                class="btn btn-success btn-sm"
                v-b-modal.book-modal>Add Book</button>

              <DraggableList :elements="booksElem" :shelfId="shelfId" />

            </section>
        </div>
    </div>

    <b-modal ref="addBookModal"
             id="book-modal"
             title="Add a new book"
             hide-backdrop content-class="shadow"
             hide-footer>
      <template>
      <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="form-title-group"
                    label="Title:"
                    label-for="form-title-input">
          <b-form-input id="form-title-input"
                        type="text"
                        v-model="addBookForm.title"
                        required
                        placeholder="Enter title">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-author-group"
                      label="Author:"
                      label-for="form-author-input">
            <b-form-input id="form-author-input"
                          type="text"
                          v-model="addBookForm.author"
                          required
                          placeholder="Enter author">
            </b-form-input>
          </b-form-group>
        <b-form-group id="form-read-group">
          <b-form-checkbox-group v-model="addBookForm.read" id="form-checks">
            <b-form-checkbox value="true">Read?</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      </template>
    </b-modal>

  </div>
</template>

<script>
import axios from 'axios';
import DraggableList from '@/components/DraggableList.vue';

export default {
  data() {
    return {
      shelfId: '',
      bookshelfName: null,
      booksElem: [],
      loading: true,
      errored: false,
      addBookForm: {
        title: '',
        author: '',
        read: [],
      },
    };
  },
  components: { DraggableList },
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
    initForm() {
      this.addBookForm.title = '';
      this.addBookForm.author = '';
      this.addBookForm.read = [];
    },
    onSubmit(event) {
      event.preventDefault();
      this.$refs.addBookModal.hide();
      let read = false;
      if (this.addBookForm.read[0]) read = true;
      const payload = {
        title: this.addBookForm.title,
        author: this.addBookForm.author,
        search_api: 'googleapis',
        read, // property shorthand
      };
      this.searchBook(payload);
    },
    searchBook(payload) {
      const path = this.$auth.baseUrl.concat('/api/booksearch/?token=').concat(this.$auth.token).concat('&uuid=').concat(this.shelfId);
      axios.post(path, payload);
      console.log(payload);
    },
    onReset() {},
  },
  created() {
    // console.log(this.$route.params.shelf);
    // console.log(this.loading);
    this.loading = true;
    this.getListBooks(this.$route.params.shelfId);
  },
};
</script>
