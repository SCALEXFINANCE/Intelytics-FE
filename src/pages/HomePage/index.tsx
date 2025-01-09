import Gainer from "./Gainer"
import Looser from "./Looser"
import Trending from "./Trending"

const HomePage = () => {
  return <div className="flex justify-between space-x-4">
   <Trending/>
   <Gainer/>
   <Looser/>
  </div>
}

export default HomePage