(function() {
  const loadJSON = function(pathToJson, callback) {
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
    xobj.responseType = "json";
    xobj.open("GET", pathToJson, true);
    xobj.onreadystatechange = function() {
      if (xobj.readyState === 4 && xobj.status === 200) {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.response);
      }
    };
    xobj.send(null);
  };

  const loadGallery = function(galleryImages) {
    galleryImages.imagesList.forEach(galleryImage =>
      showImageInGallery(galleryImage)
    );
  };

  const showImageInGallery = function(galleryImage) {
    const imageGallery = document.getElementById("imageGallery");

    imageGallery.appendChild(buildImageDom(galleryImage));
  };

  const buildImageDom = function(galleryImage) {
    const imageSource = galleryImage.source;
    const imageId = galleryImage.id;
    const imageColumns = galleryImage.isWide
      ? "col-md-8 col-sm-12"
      : "col-md-4 col-sm-6";

    const stringImageElement = `
      <div class="box">
        <a href="#" data-toggle="modal" data-target="#${imageId}">
          <img src="${imageSource}" />
        </a>
        <div class="modal fade" id="${imageId}" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span><i class="fas fa-times"></i></span>
              </button>
              <div class="modal-body">
                <img src="${imageSource}" />
              </div>
              <div class="col-md-12 description">
                <h4>${galleryImage.description}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    let domElement = document.createElement("div");
    domElement.className = `col-xs-12 gallery-item ${imageColumns}`;
    domElement.innerHTML = stringImageElement;

    return domElement;
  };

  loadJSON("/src/galleryImages.json", loadGallery);
})();
