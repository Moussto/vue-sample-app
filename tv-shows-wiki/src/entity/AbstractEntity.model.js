/**
 * Abstract mother entity
 */
export default class AbstractEntity {
  /**
     * Method used to build a new Entity object from API's datas
     */
  static buildFromApi () {
    throw (new Error('You should implement a proper method "buildFromApi" in your entity.'))
  }

  /**
     * Method used to build a JSON to send to API from an Entity object
     */
  static buildToApi () {
    throw (new Error('You should implement a proper method "buildToApi" in your entity.'))
  }
}
