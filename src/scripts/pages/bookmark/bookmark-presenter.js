import { reportMapper } from "../../data/api-mapper";


export default class BookmarkPresenter {
    #view;
    #model;

    constructor({ view, model }) {
        this.#view = view;
        this.#model = model;
    }

    async initialGalleryAndMap() {
        this.#view.showReportsListLoading();

        try {
            await this.showReportsListMap();
            
            const listOfReports = await this.#model.getAllReports();
            const reports = await Promise.all(listOfReports.map(reportMapper));

            const message =  'Berhasil mendapatkan daftar laporan tersimpan.';
            this.#view.populateBookmarkedReports(message, reports);
        } catch (err) {
            console.error('initialGalleryAndMap: error:', err);
            this.#view.populateBookmarkedReportsError(err.message);
        } finally {
            this.#view.hideReportsListLoading();
        }
    }

    async showReportsListMap() {
        this.#view.showMapLoading();
        try {
            await this.#view.initialMap();
        } catch (err) {
            console.error('showReportsListMap: error:', err);
        } finally {
            this.#view.hideMapLoading();
        }
    }
}