import { setUserFormSubmit } from './validate.js';
import { closeDownloadPicWindow } from './form.js';
import { getPictures } from './load-pictures.js';

getPictures();

setUserFormSubmit(closeDownloadPicWindow);
