import { Line, Aero, Notification, Round } from './assets/dashborad'

export function Navbar() {
    return(
        <div className='hello'>
          <div className='have'>
            <div className='header'>
              <h3>Hello, Lakan</h3>
              <p className='day'>Have a nice day</p>
            </div>
            <div className='admin'>
              <div className='icons'>
                <Notification></Notification> <Line></Line><Round></Round>
              </div>
              <div>
                <h5>Lekan Okeowo</h5>
                <h6>Admin</h6>
              </div>
              <Aero></Aero>
            </div>
          </div>
        </div>
    )
}