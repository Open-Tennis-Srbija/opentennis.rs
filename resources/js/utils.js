class Utils {
    formatAsThousands =((value)=>{
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    })

    formatDate(date){
        let raw = new Date(date);

        return `${this.getDateDay(date)} ${raw.getDate()} ${this.getDateMonth(date)} ${raw.getFullYear()}`
    }
    
    getDateDay(date){
        let days = ['ned','pon', 'uto', 'sre', 'čet', 'pet', 'sub'];
        let day = new Date(date).getDay();

        return days[day]
    }

    getDateMonth(date){
        let months = ['jan','feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'];
        let month = new Date(date).getMonth();

        return months[month]
    }

    // The page scrolls inside the OverlayScrollbars viewport, not the window,
    // so its height is what tells how close the scroll position is to the end
    isNearBottom(scrollTop, distance = 500){
        const viewport = document.querySelector('[data-overlayscrollbars-viewport]');
        if (!viewport) return false;

        return viewport.scrollHeight - scrollTop - viewport.clientHeight < distance;
    }

    // Spelled out instead of Intl.Collator, so the order doesn't depend on
    // the collation data of the browser or of the SSR server
    serbianSortKey(text){
        const alphabet = ['a','b','c','č','ć','d','dž','đ','e','f','g','h','i','j','k','l','lj','m','n','nj','o','p','q','r','s','š','t','u','v','w','x','y','z','ž'];

        return String(text).normalize('NFC').trim().toLowerCase().replace(/\d+|dž|lj|nj|./gsu, (token) => {
            if (/\d/.test(token)) return token.padStart(10, '0');

            let rank = alphabet.indexOf(token);
            // Foreign letters sort with their base letter (ö with o)
            if (rank === -1) rank = alphabet.indexOf(token.normalize('NFD')[0]);

            return rank === -1 ? token : String.fromCharCode(0xE000 + rank);
        });
    }
}

const utils  = new Utils();

export default  utils;