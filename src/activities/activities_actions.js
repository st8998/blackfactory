
export function load(activities) {
  return {
    type: 'ACTIVITIES.LOAD',
    activities
  }  
}

export function add(activity = {}) {
  return {
    type: 'ACTIVITIES.ADD',
    persist: true,
    activity
  }  
}

export function remove(activity) {
  return {
    type: 'ACTIVITIES.REMOVE',
    persist: true,
    activity
  }  
}

export function update(activity) {
  return {
    type: 'ACTIVITIES.UPDATE',
    persist: true,
    activity
  }  
}
