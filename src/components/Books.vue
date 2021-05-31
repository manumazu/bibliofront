<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Books {{ shelfId }}</h1>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shelfId: '',
    };
  },
  methods: {
    getListBooks(shelfId) {
      console.log(shelfId);
      this.shelfId = shelfId;
    },
  },
  created() {
    // console.log(this.$route.params.shelf);
    this.getListBooks(this.$route.params.shelfId);
  },
};
</script>
