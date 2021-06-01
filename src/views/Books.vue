<template>
  <div class="container" v-if="shelfId">
    <div class="row">
      <div class="col-sm-15">
        <section v-if="errored">
          <p>Nous sommes désolés, ces informations ne sont pas disponibles pour le moment.
          Veuillez réessayer ultérieurement.</p>
        </section>
        <section v-else>
          <div v-if="loading">Chargement...</div>

          <h1>Books in "{{ bookshelfName }}"</h1>
          <hr><br><br>
          <button type="button" class="btn btn-success btn-sm">Add Book</button>
          <br><br>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Read?</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>foo</td>
                <td>bar</td>
                <td>foobar</td>
                <td>
                  <div class="btn-group" role="group">
                    <button type="button" class="btn btn-warning btn-sm">Update</button>
                    <button type="button" class="btn btn-danger btn-sm">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      shelfId: null,
      bookshelfName: '',
      loading: true,
      errored: false,
    };
  },
  methods: {
    getListBooks(shelfId) {
      this.shelfId = shelfId;
      const path = this.$auth.baseUrl.concat('/api/bookshelf?token=').concat(this.$auth.token).concat('&uuid=').concat(shelfId);
      axios.get(path)
        .then((res) => {
          console.log(res.data.arduino_map.arduino_name);
          this.bookshelfName = res.data.arduino_map.arduino_name;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.errored = true;
        })
        .finally(() => { this.loading = false; });
    },
  },
  created() {
    // console.log(this.$route.params.shelf);
    this.getListBooks(this.$route.params.shelfId);
  },
};
</script>
