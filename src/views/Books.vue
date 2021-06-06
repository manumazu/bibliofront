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
              <button type="button" class="btn btn-success btn-sm">Add Book</button>
              <DraggableList :elements="booksElem" :shelfId="shelfId" />
            </section>
        </div>
    </div>
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
  },
  created() {
    // console.log(this.$route.params.shelf);
    console.log(this.loading);
    this.loading = true;
    this.getListBooks(this.$route.params.shelfId);
  },
};
</script>
