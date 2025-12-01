export default async function User( props ) {
    let { id } =await  props.params;
// dym=namic routing example: http://localhost:3000/user/123, where 123 is the id , you can access it via props.params.id  , so id=123,  
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">User Profile</h1>
            <p className="mt-2 text-gray-600">User ID: {id}</p>
        </div>
    )
}