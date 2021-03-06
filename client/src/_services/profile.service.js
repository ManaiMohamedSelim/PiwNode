import {authHeader} from "../_helpers";


export const profileService = {
    getProfile,
    addPosition,
    deletePosition,
    updatePosition,
    updateProfile,
    addEducation,
    deleteEducation,
    updateEducation,
};

function getProfile(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        mode: 'cors'
};

    return fetch("/profil/"+id, requestOptions).then(handleResponse)
        .then(profile => {
           // console.log(localStorage)
            localStorage.setItem('profile', JSON.stringify(profile));
            return profile;
        }).catch(err=>console.log(err));
}
function updateProfile(profile) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
    };

    return fetch("/profil/"+profile._id, requestOptions).then(handleResponse).then(p => {
        //console.log(user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(p)
        localStorage.setItem('profile', JSON.stringify(p));

        return profile;
    });

}
function addPosition(id,position) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(position)
    };

    return fetch("/profil/"+id+"/position", requestOptions).then(handleResponse)
        .catch(err=>console.log(err));
}
function updatePosition(id,position) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(position)
    };

    return fetch("/profil/"+id+"/position/"+position._id, requestOptions).then(handleResponse)
        .catch(err=>console.log(err));
}
function deletePosition(idProfile,idPosition) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },

    };

    return fetch("/profil/"+idProfile+"/position/"+idPosition, requestOptions).then(handleResponse)
        .catch(err=>console.log(err));
}
function addEducation(id,education) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(education)
    };

    return fetch("/profil/"+id+"/education", requestOptions).then(handleResponse)
        .catch(err=>console.log(err));
}
function updateEducation(id,education) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(education)
    };

    return fetch("/profil/"+id+"/education/"+education._id, requestOptions).then(handleResponse)
        .catch(err=>console.log(err));
}
function deleteEducation(idProfile,idPosition) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },

    };

    return fetch("/profil/"+idProfile+"/education/"+idPosition, requestOptions).then(handleResponse)
        .catch(err=>console.log(err));
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
