const gifOptions = {
    image: data => `
      <img
        class="image-gif"
        id="${data.id}"
        src="${data.images.fixed_width_small.url}"
      />
    `
  }