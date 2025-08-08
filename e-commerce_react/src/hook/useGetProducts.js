
import axios from 'axios'
import { useEffect } from 'react'
import useProductStore from '../store/store';

const useProductData = () => {
const { setProducts } = useProductStore();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/getall`);
                console.log(res.data);
                if(res.data){
                    setProducts(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useProductData 