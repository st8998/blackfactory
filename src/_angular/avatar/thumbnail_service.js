const { max } = Math

export default function register() {
  return this.service('thumbnailService', /* @ngInject */ function () {
    return {
      resize(data, [width, height]) {
        const canvas = document.createElement('canvas')
        const image = new Image()
        image.src = data

        const scale = max(width / image.width, height / image.height)

        canvas.width = width
        canvas.height = height

        canvas.getContext('2d').drawImage(
          image,
          0, 0, image.width, image.height,
          // (canvas.width - image.width * scale) / 2, (canvas.height - image.height * scale) / 2,
          0, 0, image.width * scale, image.height * scale
        )
        return canvas.toDataURL('image/png')
      }
    }
  })
}
