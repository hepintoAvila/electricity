interface ItemStorageProps {
  data?: any
  item: string
  typeOfStorage: Storage
}

const getItemStorage = ({
  typeOfStorage,
  item,
}: ItemStorageProps): object[] => {
  let storageData = []
  if (typeof typeOfStorage !== 'undefined') {
    try {
      storageData = JSON.parse(typeOfStorage?.getItem(item) || '[]')
    } catch (error) {
      console.log('e-> ', error)
    }
  }
  return storageData
}

const setItemStorage = ({ typeOfStorage, item, data }: ItemStorageProps) => {
  if (typeof typeOfStorage !== 'undefined') {
    try {
      typeOfStorage?.setItem(item, JSON.stringify(data))
    } catch (e) {
      console.error(e)
    }
  }
}

export { getItemStorage, setItemStorage }
