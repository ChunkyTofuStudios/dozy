document.addEventListener('click', function(event) {

    // get the nearest anchor tag to where the user clicked (in case they clicked on something inside the anchor tag like an <img> or <span>
    let aTag = event.target.closest('a');

    if (aTag !== null) {

        let urlParams = new URLSearchParams(window.location.search);
        let aParams = new URLSearchParams(aTag.search);

        // update the <a> tag's params with UTM params
        for (let [key, value] of urlParams.entries()) {

            // skip duplicates and only add new params that belong to UTM
            if (! aParams.has(key) && key.includes('utm_')) {
                aParams.append(key, value);
            }
        }

        // Fallback values
        if (! aParams.has('utm_source')) {
            aParams.append('utm_source', 'cts');
        }
        if (! aParams.has('utm_medium')) {
            aParams.append('utm_medium', 'web');
        }
        if (! aParams.has('utm_campaign')) {
            aParams.append('utm_campaign', 'landingpage');
        }

        // reset the anchor's URL with all the query params added
        aTag.href = aTag.href.split('?')[0] + '?' + aParams.toString();
    }

});
