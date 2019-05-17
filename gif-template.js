const gifOptions = {
    image: options => `
      <img
        class="image-gif"
        id="${options.id}"
        src="${options.images.fixed_width_small.url}"
      />
    `
  }