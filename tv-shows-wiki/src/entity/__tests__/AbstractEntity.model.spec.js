import AbstractEntity from './../AbstractEntity.model'

describe('AbstractEntity Model', () => {
  describe('buildFromApi', () => {
    it('should throw an error', () => {
      expect(AbstractEntity.buildFromApi).toThrowError('You should implement a proper method "buildFromApi" in your entity.')
    })
  })

  describe('buildToApi', () => {
    it('should throw an error', () => {
      expect(AbstractEntity.buildToApi).toThrowError('You should implement a proper method "buildToApi" in your entity.')
    })
  })
})
