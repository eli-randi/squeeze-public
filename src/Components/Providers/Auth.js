import { useContext } from "react";
import {OAUTH_HOST} from '../../util/API';
import Loader from "../Loader";
import { MetaContext } from "./MetaProvider";

export function RequireAuth(props) {
    let auth = useContext(MetaContext);


    if (auth.isLoggedIn == null) {
        return <Loader/>
    }
    if (!auth.isLoggedIn) {
        return window.location.href = OAUTH_HOST + auth.fullMeta.login_url
    }

    return props.children;
  }