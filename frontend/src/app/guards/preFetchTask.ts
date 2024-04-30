import { inject } from "@angular/core"
import { TaskService } from "../service/task.service"

export const resolves = () => {
    const taskService = inject(TaskService)
    return taskService.fetchAllTask('1', "", 'All')

}