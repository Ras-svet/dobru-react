export class UserApi {
	constructor({url, headers}) {
		this._url = url;
		this._headers = headers;
	}

	_checkResponse(response) {
		return response.ok ? response.json() : response.json().then(errData => Promise.reject(errData))
	}

	_checkResponseStatus(response) {
		if (response.ok) {
			return response.json();
		}
		return Promise.reject(response.status);
	}

  _getAuth() {
		const jwt = localStorage.getItem('jwt');
		return {
			'Authorization': `Bearer ${jwt}`,
			...this._headers,
		};
	}

  getLabs(group) {
    return fetch(`${this._url}/labs/${group}`, {
			headers: this._getAuth(),
		}).then(this._checkResponse)
  }

  getTasks(group) {
    return fetch(`${this._url}/tasks/${group}`, {
			headers: this._getAuth(),
		}).then(this._checkResponse)
  }

  getMyInfo() {
    return fetch(`${this._url}`, {
			headers: this._getAuth(),
		}).then(this._checkResponse)
  }

  getControls(group) {
    return fetch(`${this._url}/controls/${group}`, {
			headers: this._getAuth(),
		}).then(this._checkResponse)
  }

  getControl(controlId) {
    return fetch(`${this._url}/variant/${controlId}`, {
			headers: this._getAuth(),
		}).then(this._checkResponse)
  }

  getControlMarks() {
    return fetch(`${this._url}/controlmarks`, {
			headers: this._getAuth(),
		}).then(this._checkResponse)
  }

  makeAppointmentToLab(labId, variantId) {
    return fetch(`${this._url}/labs/${labId}`, {
			method: "POST",
			headers: this._getAuth(),
			body: JSON.stringify({ variantId }),
		}).then(this._checkResponse)
  }

  canselAppointmentToLab(labId, variantId) {
    return fetch(`${this._url}/labs/${labId}`, {
			method: "DELETE",
			headers: this._getAuth(),
			body: JSON.stringify({ variantId }),
		}).then(this._checkResponse)
  }

  makeAppointmentToTask(taskId) {
    return fetch(`${this._url}/tasks/${taskId}`, {
			method: "POST",
			headers: this._getAuth()
		}).then(this._checkResponse)
  }

  canselAppointmentToTask(taskId) {
    return fetch(`${this._url}/tasks/${taskId}`, {
			method: "DELETE",
			headers: this._getAuth()
		}).then(this._checkResponse)
  }

  checkAnswers(controlId, variantId, userAnswers) {
    return fetch(`${this._url}/controlmarks`, {
			method: "POST",
			headers: this._getAuth(),
      body: JSON.stringify({ controlId, variantId, userAnswers })
		}).then(this._checkResponse)
  }
}

const userApi = new UserApi({
	url: 'http://localhost:3001/users',
	headers: {
		'Content-Type': 'application/json'
	}
})

export default userApi;