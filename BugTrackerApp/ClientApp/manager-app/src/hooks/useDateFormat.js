//Packages
import moment from "moment/moment";

const useDateFormat = () => {
    const dateFormat = (value) => {
        return moment(value).format('YYYY-MM-DD');
    }
    return dateFormat;
}

export default useDateFormat;