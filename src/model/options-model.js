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
      const options = await this.#apiService.offers;
      this.#options = options.map(this.#adaptToClient);
    } catch(err) {
      this.#options = [];
    }
  }

  #adaptToClient = (offers) => {
    const adaptedOptions = {
      options: offers,
    };

    return adaptedOptions;
  }
}
