import Realm from 'realm'

import RepositorySchema from '../schemas/RepositorySchema'

const getRealm = () => {
  return Realm.open({
    schema: [RepositorySchema]
  })
}

export default getRealm
