function StatCard({ title, value, icon: Icon }) {


  return (

    <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">


      <div>

        <p className="text-gray-500 text-sm">
          {title}
        </p>


        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

      </div>



      {
        Icon && (

          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">

            <Icon size={28}/>

          </div>

        )
      }


    </div>

  );

}


export default StatCard;