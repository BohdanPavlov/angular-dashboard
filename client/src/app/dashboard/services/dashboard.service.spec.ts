import {HttpClient} from '@angular/common/http'
import {of} from 'rxjs'
import Expected = jasmine.Expected

import {DashboardService} from 'src/app/dashboard/services/dashboard.service'

const BoardsMock: Expected<any> = [
  {
    _id: 'test',
    name: 'test',
    description: 'test',
    createdAt: 'test',
    lists: []
  }
]

describe('Dashboard Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let service: DashboardService

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])

    service = new DashboardService(httpClientSpy)
  })

  it('should return boards', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(BoardsMock))

    service.fetchBoards().subscribe({
      next: (boards) => {
        expect(boards).toEqual(BoardsMock)
        done()
      },
      error: done.fail
    })

    expect(httpClientSpy.get.calls.count()).toBe(1)
  })
})
