class TaskManager {
  tasks = [];

  queue(task) {
    this.tasks.push(task);
  }

  async performAll({ concurrent = 10 } = {}) {
    const size = this.tasks.length > concurrent ? concurrent : this.tasks.length;
    const promises = [];

    for (let i = 0; i < size; i++) {
      promises.push(this.tasks.pop()());
    }

    await Promise.all(promises);

    if (this.tasks.length) {
      return await this.performAll({ concurrent: concurrent });
    }
  }
}

module.exports = TaskManager;
