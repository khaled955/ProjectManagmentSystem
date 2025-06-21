
export default function NoData({message="No Projects Found"}:{message?:string}) {
  return (
     <tr>
      <td colSpan={6} className="text-center py-4 text-muted">
       {message}
      </td>
    </tr>
  )
}
