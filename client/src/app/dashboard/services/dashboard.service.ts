import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'src/environments/environment'
import {BoardInterface} from 'src/app/shared/types/board.interface'
import {CreateBoardRequestInterface} from 'src/app/dashboard/types/createBoardRequest.interface'

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  fetchBoards(): Observable<BoardInterface[]> {
    const url = environment.apiUrl + '/boards'

    return this.http.get<BoardInterface[]>(url)
  }

  createBoard(
    boardData: CreateBoardRequestInterface
  ): Observable<BoardInterface> {
    const url = environment.apiUrl + '/boards'

    return this.http.post<BoardInterface>(url, boardData)
  }

  editBoard(
    boardData: CreateBoardRequestInterface,
    boardId: string
  ): Observable<string> {
    const url = environment.apiUrl + `/boards/${boardId}`

    return this.http.put<string>(url, boardData)
  }

  deleteBoard(boardId: string): Observable<string> {
    const url = environment.apiUrl + `/boards/${boardId}`

    return this.http.delete<string>(url)
  }
}
