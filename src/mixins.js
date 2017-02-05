export default {
  methods: {
    get_areaMembers (ring, area) {
      return this.db.ref('member/' + ring + '/' + area)
    },
    get_ringMembers (ring) {
      return this.db.ref('member/' + ring)
    }
  }
}
