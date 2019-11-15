export const link = Behavior({
  properties: {
    url: String,
    linkType: {
      type: String,
      value: 'navigateTo'
    }
  },
  methods: {
    jumpLink(urlKey = 'url') {
      const url = this[urlKey];

      if (url) {
        wx[this.linkType]({
          url
        });
      }
    }

  }
});