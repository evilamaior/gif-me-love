const gifOptions = {
    image: data[index] => `
      <img
        class="image-gif"
        id="${data.id}"
        src="${data.images.fixed_width_small.url}"
      />
    `
  }