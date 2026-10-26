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
}

const utils  = new Utils();

export default  utils;