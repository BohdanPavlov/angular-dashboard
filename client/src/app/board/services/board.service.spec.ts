import {HttpClient} from '@angular/common/http'
import {of} from 'rxjs'
import Expected = jasmine.Expected

import {BoardService} from 'src/app/board/services/board.service'

const ListsMock: Expected<any> = [
  {
    lists: [],
    boardName: 'Test'
  }
]

describe('Board Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let service: BoardService

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'patch',
      'delete'
    ])

    service = new BoardService(httpClientSpy)
  })

  it('should return lists', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(ListsMock))

    service.getLists('test').subscribe({
      next: (lists) => {
        expect(lists).toEqual(ListsMock)
        done()
      },
      error: done.fail
    })

    expect(httpClientSpy.get.calls.count()).toBe(1)
  })
})
