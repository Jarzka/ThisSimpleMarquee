Quick Start
=================

1. Link jQuery and jQuery Mobile to your project. Example:
--------------
<script src="scripts/js/libraries/jquery-1.11.1.min.js"></script>
<script>jQuery(document).on("mobileinit", function() { jQuery.mobile.autoInitializePage = false; });</script>
<script src="scripts/js/libraries/jquery.mobile-1.3.2.min.js"></script>
    
2. Link thissimplemarquee-x.js to your project. Example:
--------------
<script src="scripts/js/thissimplemarquee-1.0.js"></script>

3. Link thissimplemarquee-x.css to your project. Example:
--------------
<link rel="stylesheet" type="text/css" href="style/thissimplemarquee-1.0.css">
Note: thissimplemarquee-x folder containing nav icons should be located in the same folder as thissimplemarquee.css

4. Add Marquee HTML code in to your page. Example:
--------------
<div id="marquee-1" class="tsm-marquee">
    <div class="photos"></div>
    <div class="caption"></div>
    <div class="navigation"></div>
</div>
You can use whatever id you want but every marquee should have an unique id.

5. When the page is loaded, create new instance of ThisSimpleMarqueeController and pass the marquee id, contents and options. Example:
--------------
<script>
    $(function() {

        var contents = [
            {
                imageSrc: "media/images/1.jpg",
                caption: "Caption1"
            },
            {
                imageSrc: "media/images/2.jpg",
                caption: "Caption2"
            },
            {
                imageSrc: "media/images/3.jpg",
                caption: "Caption3"
            },
        ];
        var options = {
            fade: "carousel",
            autoplay: false,
            autoplayTimeMs: 5000
        };
        var controller = new ThisSimpleMarqueeController("marquee-1", contents, options);
    })
</script>