export default class OptionsModel {
  #apiService = null;
  #options = [];

  constructor(apiService) {
    this.#apiService = apiService;
  }

  get options() {
    return this.#options;
  }

  init = async () => {
    try {
      this.#options = await this.#apiService.offers;
    } catch(err) {
      this.#options = [];
    }
  }
}
