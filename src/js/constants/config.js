const NODE_ENV = process.env.NODE_ENV || 'development';
const MY_SERVER = NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://api.murnews.students.nomoreparties.xyz';

export const myServerConfig = {
  baseUrl: `${MY_SERVER}`,
  headers: {
    'Content-Type': 'application/json'
  }
}