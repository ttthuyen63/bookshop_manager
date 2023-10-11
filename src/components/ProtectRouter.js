import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectRouter(props) {
  const navigate = useNavigate();
  const tokenAdmin =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlOWI4ODBmODE4MmRkYTU1N2Y3YzcwZTIwZTRlMzcwZTNkMTI3NDciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlicmFyeW1hbmFnZXItYWNkYzciLCJhdWQiOiJsaWJyYXJ5bWFuYWdlci1hY2RjNyIsImF1dGhfdGltZSI6MTY3MzA1ODU2NiwidXNlcl9pZCI6InBQZXdHUXdPdDZUMVpBcjZ3Y3RwN0FDd3V3ajIiLCJzdWIiOiJwUGV3R1F3T3Q2VDFaQXI2d2N0cDdBQ3d1d2oyIiwiaWF0IjoxNjczMDU4NTY2LCJleHAiOjE2NzMwNjIxNjYsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFkbWluQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.F8Wnb-Cei1gf5_g2k6bKY7Fmo5468hVPIWRoZr9l5yEud6HOpsNBHwDFJ2VETr4VzFqJ72C2xxoyBQT1fwVaUZlQOfFvIGCbacfZUhaoMqGPQbPqx-XVeUTuiJDxz_fhy11Ab3VTRGtx_DYX78FusCgBXfJBd1Lytha0-fBNJBY0bk3qeRRkz4Eg821C8G58zMXjlGeewvd7GBOajcJAjhG9lH7mTiPqmxvBz742u-Y6paubJssvSZukZ5XGn49qeP5TmoZQzHUpmpKhdTUdXAl8j7Ov6Wxgc41554W0kY6ZW3RsHsCJs5JCbhJQEnOo7Bm-t9nt3xv6plCYa0NwIw";
  const token = useSelector((state) => state.userReducer.token);
  return token !== null ? (
    props.children
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
