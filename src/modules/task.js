export default class Task {
  constructor(id, description, status) {
    this.id = id
    this.description = description
    this.status = status
    this.createdAt = new Date()
    this.updatedAt = this.createdAt
  }
}
