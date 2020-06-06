import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Novel from './Novel'
import Search from './Search'


export default () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [novelsList, setNovelsList] = useState([])
  const [filteredNovelList, setFilteredNovelList] = useState([])

  useEffect(() => {
    async function pullData() {
      const { data } = await axios.get('http://localhost:1337/api/novels')


      setNovelsList(data)
      setFilteredNovelList(data)
    }

    pullData()
  }, [])

  useEffect(() => {
    const filtered = novelsList.filter(novel => (
      novel.title.toLowerCase().includes(searchTerm.toLowerCase())
    ))

    setFilteredNovelList(filtered)
  }, [searchTerm])

  return (
    <div className="page">
      <div className="title">Great Novels </div>
      <Search term={searchTerm} setter={setSearchTerm} />
      {
        filteredNovelList.map(novel => (<Novel key={novel.id} title={novel.title} />))
      }
    </div>
  )
}
