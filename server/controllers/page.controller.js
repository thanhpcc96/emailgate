import Page from '../models/page';
import Compilation from '../models/compilation';

export function getCompilationPages(req, res) {
  Page.find({ _compilation: req.params.id })
  .then((pages) => {
    if (pages.length > 0) {
      return res.json(pages);
    }

    return Compilation.findOne({ _id: req.params.id })
    .then((compilation) => {
      return compilation.seedPages();
    })
    .then(() => {
      return Page.find({ _compilation: req.params.id });
    })
    .then((newPages) => {
      return res.json(newPages);
    });
  });
}
