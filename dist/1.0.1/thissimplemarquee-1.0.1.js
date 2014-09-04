/**
 * Please note: Creating a new instance of ThisSimpleMarqueeController makes a copy of every single
 * function inside it. This can consume lots of memory but should not be a problem if there are
 * not many marquees in one page.
 */

/**
 * @param contents Should look like this:
 * [
 *     {
 *         imageSrc: "media/images/1.jpg",
 *         caption: "Caption for image 1."
 *     },
 *     {
 *         imageSrc: "media/images/2.jpg",
 *         caption: "Caption for image 2."
 *     },
 *     ... // More data objects if necessary
 * ]
 * @param options Should look like this:
 * {
 *     fade: "basic", // Possible values: "basic", "carousel"
 *     autoplay: false
 *     autoplayTimeMs: 5000
 * }
 */
function ThisSimpleMarqueeController(marqueeIDInHTML, contents, options) {

    // Private

    var selectedImageIndex = 0; // 0-index
    var marqueeContents;
    var marqueeOptions;
    var marqueeId;
    var lastUserInputTimestamp = 0;

    function initializeFade() {
        if (marqueeOptions.fade === "basic") {
            // Hide all images by default & add transition
            $("#" + marqueeId + " .tsm-photos img").each(function() {
                $(this).css("opacity", 0);
                $(this).css("transition", "all 1s");
            });
        } else if (marqueeOptions.fade === "carousel") {
            // Position images
            var photosWidth = $("#" + marqueeId + " .tsm-photos").width();
            $("#" + marqueeId + " .tsm-photos img").each(function(index) {
                $(this).css("left", (index * photosWidth) - selectedImageIndex * photosWidth);
            });

            /* Add transition
             * Note: The transition is added after a small delay. If the transition was added
             * without the delay, it would show up immediately.
             */
            setTimeout(function() {
                $("#" + marqueeId + " .tsm-photos img").each(function() {
                    $(this).css("transition", "all 0.5s");
                });
            }, 500);
        }
    }

    function addImages() {
        marqueeContents.forEach(function(entry) {
            var marqueePhotosElement = $("#" + marqueeId + " .tsm-photos");
            var newImage = $("<img class='marquee-photo' alt='' src='" + entry.imageSrc + "'>");
            newImage.on('dragstart', function(event) { event.preventDefault(); });
            marqueePhotosElement.append(newImage);
        });
    }

    function addCaption() {
        var marqueeCaptionElement = $("#" + marqueeId + " .tsm-caption");
        var newCaption = $("<p class='tsm-caption-text'>Marquee Caption</p>");
        marqueeCaptionElement.append(newCaption);
    }

    function addNavigation() {
        var marqueeNavigationElement = $("#" + marqueeId + " .tsm-navigation");
        marqueeContents.forEach(function() {
            marqueeNavigationElement.append("<img class='marquee-nav-button' src='style/thissimplemarquee-1.0.1/nav_button.svg'>");
        });
    }

    function deactivateAllNavButtons() {
        $("#" + marqueeId + " .tsm-navigation img").each(function() {
            $(this).attr("src", "style/thissimplemarquee-1.0.1/nav_button.svg");
        });
    }

    function fixCaptionTextSize() {
        // Add padding right to the caption. The size of the padding should cover all nav buttons.
        // The amount of nav buttons is the same as the amount of images. Calculate width.
        var paddingSize = marqueeContents.length * 30;
        $("#" + marqueeId + " .tsm-caption").css("padding-right", paddingSize);
    }

    function selectImageWithBasicFade(index) {
        // Hide previous image
        $("#" + marqueeId + " .tsm-photos img").eq(selectedImageIndex).css("opacity", 0);

        // Show selected image
        selectedImageIndex = index;
        $("#" + marqueeId + " .tsm-photos img").eq(selectedImageIndex).css("opacity", 1);
    }

    function selectImageWidthCarouselFade(index) {
        selectedImageIndex = index;

        // Update images CSS
        var photosWidth = $("#" + marqueeId + " .tsm-photos").width();
        $("#" + marqueeId + " .tsm-photos img").each(function(index) {
            $(this).css("left", (index * photosWidth) - selectedImageIndex * photosWidth);
        });
    }

    function selectImage(index) {
        if (marqueeOptions.fade === "basic") {
            selectImageWithBasicFade(index);
        } else if (marqueeOptions.fade === "carousel") {
            selectImageWidthCarouselFade(index);
        } else {
            console.log("WARNING: Unable to select image because fade is not defined.");
        }

        // Update navigation CSS
        deactivateAllNavButtons();
        $("#" + marqueeId + " .tsm-navigation img").eq(index).attr("src", "style/thissimplemarquee-1.0.1/nav_button_active.svg");

        // Update caption
        $("#" + marqueeId + " .tsm-caption-text").text(marqueeContents[index].caption);
        updateCaptionHeight();
    }

    function selectNextImage() {
        var select = selectedImageIndex;
        select++;

        if (select > marqueeContents.length - 1) {
            select = 0;
        }

        selectImage(select);
    }

    function selectPreviousImage() {
        var select = selectedImageIndex;
        select--;

        if (select < 0) {
            select = marqueeContents.length - 1;
        }

        selectImage(select);
    }

    function bindEvents() {
        function updateUserInputTimestamp() {
            lastUserInputTimestamp = new Date().getTime();
        }

        $("#" + marqueeId + " .tsm-navigation img").each(function(index) {
            $(this).click(function(e) {
                updateUserInputTimestamp();
                selectImage(index);
            });
        });

        $("#" + marqueeId).swipeleft(function() {
            updateUserInputTimestamp();
            selectNextImage();
        });

        $("#" + marqueeId).swiperight(function() {
            updateUserInputTimestamp();
            selectPreviousImage();
        });
    }

    function updateCaptionHeight() {
        var captionText = $("#" + marqueeId + " .tsm-caption-text");
        if (captionText.text().length != 0) {
            $("#" + marqueeId + " .tsm-caption").css("height", captionText.height() + 30);
            $("#" + marqueeId + " .tsm-caption").css("bottom", 0);
        } else {
            $("#" + marqueeId + " .tsm-caption").css("height", 0);
            $("#" + marqueeId + " .tsm-caption").css("bottom", "-30px");
        }
    }

    function handleAutoplay() {
        if (marqueeOptions.autoplay) {
            setInterval(function() {
                if (new Date().getTime() >= lastUserInputTimestamp + marqueeOptions.autoplayTimeMs) {
                    selectNextImage();
                }
            }, marqueeOptions.autoplayTimeMs);
        }
    }

    function initializeMarquee(marqueeIDInHTML,contents, options) {
        marqueeContents = contents;
        marqueeOptions = options;
        marqueeId = marqueeIDInHTML;

        // Construct marquee
        addImages();
        addCaption();
        addNavigation();

        // Add details & fix problems
        initializeFade();
        fixCaptionTextSize();
        updateCaptionHeight();
        handleAutoplay();

        bindEvents();

        selectImage(0);
    }

    // Public

    // Constructor

    initializeMarquee(marqueeIDInHTML, contents, options);
}