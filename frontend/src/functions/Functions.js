import { addHours, format, isBefore, isEqual, parseISO, startOfDay, startOfToday } from "date-fns";
import { fr } from "date-fns/locale";

export const isArrayNotNull = (data) => {
    return Array.isArray(data) && data.length > 0;
};

export const isArray = (data) => {
    return Array.isArray(data);
};

export const filterObjSame = (data, key, value) => {
    if (!value) {
        return data.filter((object) =>
            isArray(object[key]) ? object[key].length > 0 : object[key]
        );
    }
    return data.filter((object) => object[key] == value);
};

export const filterObjdiff = (data, key, value) => {
    if (!value) {
        return data.filter((object) => 
            isArray(object[key])? object[key].length <= 0 :!object[key]);
    }
    return data.filter((object) => object[key] !== value);
};

export const include = (data, value) => {
    return data.includes(value);
};


export const formatDate = (date)=>{
    const dateString = parseISO(date)
    const timezone = -3;
    const localDate = addHours(dateString,timezone)
    return localDate
}

export const formatDateISO = (date)=>{
    const dateString = parseISO(date)
    const timezone = -3;
    const localDate = addHours(dateString,timezone)
    return parseISO(localDate)
}

export const date_time = (date)=>{
    const formated_date = formatDate(date)
    const date_hour = format(formated_date , "dd/MM/yyyy , HH:mm")
    return date_hour
}


export const date_d_m_y = (date)=>{
    const formated_date = formatDate(date)
    const d_m_y = format(formated_date , "dd/MM/yyyy")
    return d_m_y
}


export const dateType = (date)=>{
    const formated_date = formatDate(date)
    const dateType = format(formated_date , 'yyyy-MM-dd')
    return dateType
}

export const today_d_m_y = ()=>{
    const today = new Date()
    const d_m_y = format(today ,"dd/MM/yyyy" )
    return d_m_y 
}


export const today_string = ()=>{
    const today = startOfToday()
    return format(today, "EEEE,dd MMMM yyyy", { locale: fr });
}


export const getDomain = (url)=>{
    try {
        return new URL(url).hostname
    } catch (error) {
        return url
    }
}

export const calcluNote = (tasks)=>{
    const pointPerTasks = {
        'Achevée': 20,
        'Achevée (avec retard)': 10,
        'Inachevée': 0,
    }
    
    const total_score = tasks.reduce((acc, task) => {
        const points = pointPerTasks[task.observation] || 0;
        return acc + points;
    }, 0);
    
    const max_possible_Score = tasks.length * 20;
    
    return max_possible_Score > 0 
        ? Math.round((total_score / max_possible_Score) * 20)
        : 0;
}

export const isBeforeEqual = (date_fin , date_debut)=>{
    const debut= startOfDay(date_debut)
    const fin = startOfDay(date_fin)
    const isEqualDate = isEqual(debut,fin)
    const isBeforeDate = isBefore(fin,debut)
    return isEqualDate || isBeforeDate
}