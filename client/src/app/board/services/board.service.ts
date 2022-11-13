import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'src/environments/environment'
import {GetListsResponseInterface} from 'src/app/board/types/getListsResponse.interface'
import {TaskInterface} from 'src/app/shared/types/task.interface'
import {AddTaskRequestInterface} from 'src/app/board/types/addTaskRequest.interface'

@Injectable()
export class BoardService {
  constructor(private http: HttpClient) {}

  getLists(boardId: string): Observable<GetListsResponseInterface> {
    const url = environment.apiUrl + `/lists?boardId=${boardId}`

    return this.http.get<GetListsResponseInterface>(url)
  }

  getTasks(boardId: string): Observable<TaskInterface[]> {
    const url = environment.apiUrl + `/tasks?boardId=${boardId}`

    return this.http.get<TaskInterface[]>(url)
  }

  addTask(request: AddTaskRequestInterface): Observable<TaskInterface> {
    const url = environment.apiUrl + '/tasks'

    return this.http.post<TaskInterface>(url, request)
  }

  editTask(taskId: string, newName: string): Observable<string> {
    const url = environment.apiUrl + `/tasks/${taskId}`

    return this.http.put<string>(url, {name: newName})
  }

  deleteTask(taskId: string): Observable<string> {
    const url = environment.apiUrl + `/tasks/${taskId}`

    return this.http.delete<string>(url)
  }

  changeTaskList(listId: string, taskId: string): Observable<string> {
    const url = environment.apiUrl + `/tasks/${taskId}`

    return this.http.patch<string>(url, {listId})
  }

  archiveTask(taskId: string): Observable<string> {
    const url = environment.apiUrl + `/tasks/${taskId}/archive`

    return this.http.patch<string>(url, {})
  }
}
