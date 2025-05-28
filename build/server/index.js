import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Link, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, createContext, useState, useContext, useRef, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const CurUserContext = createContext({});
function Ava({ figureClass, id }) {
  return /* @__PURE__ */ jsx("figure", { className: figureClass, children: /* @__PURE__ */ jsx("img", { className: "ava__img", src: `/${id}.webp`, alt: "Ava" }) });
}
function Header({ curUser, setCurUser }) {
  return /* @__PURE__ */ jsx("header", { className: "header", children: /* @__PURE__ */ jsx("div", { className: "header__container row row_spaced", children: curUser.name ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Ava, { figureClass: "ava", id: curUser.id }),
    /* @__PURE__ */ jsx(Link, { className: "btn btn_red", to: "/login", onClick: () => setCurUser({ following_ids: [] }), children: "Выйти" })
  ] }) : /* @__PURE__ */ jsx(Link, { className: "btn btn_yellow", to: "/login", children: "Войти" }) }) });
}
function Footer({ curUser }) {
  return /* @__PURE__ */ jsx("footer", { className: "footer", children: curUser.name && /* @__PURE__ */ jsxs("nav", { className: "footer__container row row_spaced", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", children: "Посты" }),
    /* @__PURE__ */ jsx(Link, { to: `/users/${curUser.id}`, children: "Профиль" }),
    /* @__PURE__ */ jsx(Link, { to: "/users", children: "Люди" })
  ] }) });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  const [curUser, setCurUser] = useState({
    following_ids: []
  });
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsx("body", {
      children: /* @__PURE__ */ jsxs("div", {
        className: "wrapper",
        children: [/* @__PURE__ */ jsx(Header, {
          curUser,
          setCurUser
        }), /* @__PURE__ */ jsx("main", {
          className: "main",
          children: /* @__PURE__ */ jsxs("div", {
            className: "main__container",
            children: [/* @__PURE__ */ jsx(CurUserContext.Provider, {
              value: {
                curUser,
                setCurUser
              },
              children
            }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
          })
        }), /* @__PURE__ */ jsx(Footer, {
          curUser
        })]
      })
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Autor({ id, name, time }) {
  return /* @__PURE__ */ jsxs(Link, { className: "row", to: `/users/${id}`, children: [
    /* @__PURE__ */ jsx(Ava, { figureClass: "ava", id }),
    /* @__PURE__ */ jsx("h4", { children: name }),
    /* @__PURE__ */ jsx("time", { className: "post__time", children: time })
  ] });
}
function Post({ post }) {
  var _a;
  return /* @__PURE__ */ jsxs("div", { className: "post", children: [
    /* @__PURE__ */ jsx(Autor, { id: post.user_id, name: post.name, time: post.time }),
    /* @__PURE__ */ jsx(Link, { className: "post__body", to: `/posts/${post.id}`, children: post.body }),
    /* @__PURE__ */ jsx("div", { className: "post__imgs", children: (_a = post.images) == null ? void 0 : _a.map((img) => /* @__PURE__ */ jsx("figure", { className: "post__img", children: /* @__PURE__ */ jsx("img", { src: `${img.url}`, alt: "PostImg" }) }, img.id)) })
  ] });
}
function meta$2({}) {
  return [{
    title: "blog"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function Home() {
  const {
    curUser
  } = useContext(CurUserContext);
  const search = useRef("");
  const data = useRef("");
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/api/v1/posts");
      data.current = await res.json();
      setPosts(data.current.filter((p) => curUser.following_ids.includes(p.user_id)));
    })();
  }, []);
  function searchPosts() {
    setPosts(data.current.filter((p) => p.body.includes(search.current.value)));
  }
  return /* @__PURE__ */ jsxs("section", {
    className: "section",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "row",
      children: [curUser.name && /* @__PURE__ */ jsx(Link, {
        className: "btn",
        to: "/new",
        children: "Пост"
      }), /* @__PURE__ */ jsx("input", {
        className: "input",
        placeholder: "Поиск постов...",
        ref: search,
        onChange: searchPosts
      })]
    }), posts ? posts.map((p) => /* @__PURE__ */ jsx(Post, {
      post: p
    }, p.id)) : /* @__PURE__ */ jsx("p", {
      children: "Загрузка..."
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [];
}
const login = withComponentProps(function Login() {
  const {
    setCurUser
  } = useContext(CurUserContext);
  const navigate = useNavigate();
  const email = useRef("");
  async function login2(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/v1/users");
    const data = await res.json();
    setCurUser(data.find((u) => u.email === email.current.value));
    navigate("/");
  }
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h1", {
      className: "title",
      children: "Log in"
    }), /* @__PURE__ */ jsxs("form", {
      className: "section",
      onSubmit: login2,
      children: [/* @__PURE__ */ jsx("fieldset", {
        children: /* @__PURE__ */ jsxs("label", {
          children: ["Email", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("input", {
            className: "input",
            type: "email",
            ref: email
          })]
        })
      }), /* @__PURE__ */ jsx("fieldset", {
        children: /* @__PURE__ */ jsxs("label", {
          children: ["Password", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("input", {
            className: "input"
          })]
        })
      }), /* @__PURE__ */ jsxs("fieldset", {
        className: "row",
        children: [/* @__PURE__ */ jsx("button", {
          className: "btn",
          children: "Log in"
        }), /* @__PURE__ */ jsx(Link, {
          className: "btn",
          to: "/signup",
          children: "Sign up"
        })]
      })]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const signup = withComponentProps(function Signup() {
  const {
    setCurUser
  } = useContext(CurUserContext);
  const navigate = useNavigate();
  const email = useRef("");
  const name = useRef("");
  const pass = useRef("");
  async function signup2(e) {
    e.preventDefault();
    await fetch("http://localhost:3000/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          email: email.current.value,
          name: name.current.value,
          password: pass.current.value
        }
      })
    });
    const res = await fetch("http://localhost:3000/api/v1/users");
    const data = await res.json();
    setCurUser(data.find((u) => u.email === email.current.value));
    navigate("/");
  }
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h1", {
      className: "title",
      children: "Sign up"
    }), /* @__PURE__ */ jsxs("form", {
      className: "section",
      onSubmit: signup2,
      children: [/* @__PURE__ */ jsx("fieldset", {
        children: /* @__PURE__ */ jsxs("label", {
          children: ["Email", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("input", {
            className: "input",
            type: "email",
            ref: email
          })]
        })
      }), /* @__PURE__ */ jsx("fieldset", {
        children: /* @__PURE__ */ jsxs("label", {
          children: ["Name", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("input", {
            className: "input",
            ref: name
          })]
        })
      }), /* @__PURE__ */ jsx("fieldset", {
        children: /* @__PURE__ */ jsxs("label", {
          children: ["Password (6 characters minimum)", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("input", {
            className: "input",
            ref: pass
          })]
        })
      }), /* @__PURE__ */ jsxs("fieldset", {
        className: "row",
        children: [/* @__PURE__ */ jsx("button", {
          className: "btn",
          children: "Sign up"
        }), /* @__PURE__ */ jsx(Link, {
          className: "btn",
          to: "/login",
          children: "Log in"
        })]
      })]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: signup
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [];
}
const postView = withComponentProps(function PostView() {
  var _a;
  const {
    id: postId
  } = useParams();
  const {
    curUser
  } = useContext(CurUserContext);
  const comment = useRef("");
  const [post, setPost] = useState({});
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/v1/posts/${postId}`);
      const data = await res.json();
      setPost(data);
    })();
  }, []);
  async function sendComment(e) {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/v1/users/${curUser.id}/posts/${postId}/comments`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comment: comment.current.value
      })
    });
    const data = await res.json();
    const clone = window.structuredClone(post);
    clone.comments.unshift({
      ...data,
      name: curUser.name
    });
    setPost(clone);
    comment.current.value = "";
  }
  return /* @__PURE__ */ jsxs("section", {
    className: "section",
    children: [/* @__PURE__ */ jsx(Post, {
      post
    }), /* @__PURE__ */ jsxs("form", {
      action: "",
      onSubmit: sendComment,
      children: [/* @__PURE__ */ jsx("textarea", {
        className: "input",
        placeholder: "Комментарий...",
        ref: comment
      }), /* @__PURE__ */ jsxs("div", {
        className: "row",
        children: [/* @__PURE__ */ jsx("button", {
          className: "btn",
          children: "Отправить"
        }), /* @__PURE__ */ jsx(Link, {
          to: `/edit/${postId}`,
          className: "btn",
          children: "Редактировать пост"
        })]
      })]
    }), (_a = post.comments) == null ? void 0 : _a.map((c) => /* @__PURE__ */ jsxs("div", {
      className: "post",
      children: [/* @__PURE__ */ jsx(Autor, {
        id: c.user_id,
        name: c.name,
        time: c.time
      }), /* @__PURE__ */ jsx("p", {
        children: c.body
      })]
    }, c.id))]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: postView,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function Form({ url, method, body = "" }) {
  const navigate = useNavigate();
  const bodyRef = useRef(body);
  const imgs = useRef(null);
  async function send(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("body", bodyRef.current.value);
    for (const file of imgs.current.files)
      fd.append("images[]", file);
    await fetch(`http://localhost:3000/api/v1/${url}`, {
      method,
      body: fd
    });
    navigate("/");
  }
  return /* @__PURE__ */ jsxs("form", { className: "section", action: "", onSubmit: send, children: [
    /* @__PURE__ */ jsx("fieldset", { children: /* @__PURE__ */ jsx("textarea", { className: "input", ref: bodyRef, defaultValue: body }) }),
    /* @__PURE__ */ jsx("fieldset", { children: /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", multiple: "true", ref: imgs }) }),
    /* @__PURE__ */ jsx("button", { className: "btn", children: "Готово" })
  ] });
}
const _new = withComponentProps(function New() {
  const {
    curUser
  } = useContext(CurUserContext);
  return /* @__PURE__ */ jsx(Fragment, {
    children: curUser.name ? /* @__PURE__ */ jsx(Form, {
      url: `users/${curUser.id}/posts`,
      method: "post"
    }) : /* @__PURE__ */ jsx("p", {
      children: "Войдите, чтобы создать пост"
    })
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _new
}, Symbol.toStringTag, { value: "Module" }));
const edit = withComponentProps(function Edit() {
  var _a;
  const {
    id: postId
  } = useParams();
  const navigate = useNavigate();
  const {
    curUser
  } = useContext(CurUserContext);
  const [post, setPost] = useState({});
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/v1/posts/${postId}`);
      const data = await res.json();
      setPost(data);
    })();
  }, []);
  async function purgeImg(id, i) {
    await fetch(`http://localhost:3000/api/v1/purge_image/${id}`, {
      method: "delete"
    });
    const clone = window.structuredClone(post);
    clone.images.splice(i, 1);
    setPost(clone);
  }
  async function destroy() {
    await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
      method: "delete"
    });
    navigate("/");
  }
  return /* @__PURE__ */ jsx("section", {
    className: "section",
    children: curUser.id === post.user_id ? /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx("div", {
        className: "post__imgs",
        children: (_a = post.images) == null ? void 0 : _a.map((img, i) => /* @__PURE__ */ jsxs("figure", {
          className: "post__img",
          children: [/* @__PURE__ */ jsx("img", {
            src: img.url,
            alt: "PostImg"
          }), /* @__PURE__ */ jsx("button", {
            className: "btn btn_red",
            onClick: () => purgeImg(img.id, i),
            children: "Удалить"
          }, img.id)]
        }, img.id))
      }), /* @__PURE__ */ jsx(Form, {
        url: `posts/${postId}`,
        method: "put",
        body: post.body
      }), /* @__PURE__ */ jsx("button", {
        className: "btn btn_red",
        onClick: destroy,
        children: "Удалить"
      })]
    }) : /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx("p", {
        children: "Вы не являетесь создателем"
      }), /* @__PURE__ */ jsx(Link, {
        className: "btn",
        to: `/posts/${postId}`,
        children: "Назад"
      })]
    })
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: edit
}, Symbol.toStringTag, { value: "Module" }));
function Card({ id, name }) {
  return /* @__PURE__ */ jsxs(Link, { className: "user-card row", to: `/users/${id}`, children: [
    /* @__PURE__ */ jsx(Ava, { figureClass: "user-card__ava", id }),
    /* @__PURE__ */ jsx("h3", { className: "user-card__name", children: name })
  ] });
}
const users = withComponentProps(function Users() {
  const [users2, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/api/v1/users");
      const data = await res.json();
      setUsers(data);
    })();
  }, []);
  return /* @__PURE__ */ jsx("section", {
    className: "section",
    children: users2.map((u) => /* @__PURE__ */ jsx(Card, {
      id: u.id,
      name: u.name
    }, u.id))
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: users
}, Symbol.toStringTag, { value: "Module" }));
const user = withComponentProps(function User() {
  var _a;
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    curUser,
    setCurUser
  } = useContext(CurUserContext);
  const [user2, setUser] = useState({});
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/v1/users/${id}`);
      const data = await res.json();
      setUser(data);
    })();
  }, []);
  async function follow(flag) {
    const res = await fetch(`http://localhost:3000/users/${curUser.id}/follow/${id}/${flag}.json`, {
      method: "post"
    });
    const data = await res.json();
    const clone = window.structuredClone(curUser);
    clone.following_ids = data;
    setCurUser(clone);
    navigate("/");
  }
  return /* @__PURE__ */ jsxs("section", {
    className: "section",
    children: [/* @__PURE__ */ jsx(Card, {
      id,
      name: user2.name
    }), curUser.name && (curUser.id == id && /* @__PURE__ */ jsx(Link, {
      className: "btn",
      to: "/new",
      children: "Пост"
    }) || curUser.following_ids.includes(+id) && /* @__PURE__ */ jsx("button", {
      className: "btn btn_red",
      onClick: () => follow(false),
      children: "Отписаться"
    }) || /* @__PURE__ */ jsx("button", {
      className: "btn",
      onClick: () => follow(true),
      children: "Подписаться"
    })), (_a = user2.posts) == null ? void 0 : _a.map((p) => /* @__PURE__ */ jsx(Post, {
      post: p
    }, p.id))]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: user
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CyDsO4bS.js", "imports": ["/assets/chunk-D4RADZKF-F8gbsHt2.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-C_c9QYj3.js", "imports": ["/assets/chunk-D4RADZKF-F8gbsHt2.js", "/assets/with-props-BITBR5i4.js", "/assets/context-DqGd4opN.js", "/assets/ava-C2JHgPho.js"], "css": ["/assets/root-BIQjy6vq.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-DvTKZf28.js", "imports": ["/assets/with-props-BITBR5i4.js", "/assets/chunk-D4RADZKF-F8gbsHt2.js", "/assets/context-DqGd4opN.js", "/assets/post-tiVzxYm2.js", "/assets/ava-C2JHgPho.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-ByXJqtsZ.js", "imports": ["/assets/with-props-BITBR5i4.js", "/assets/chunk-D4RADZKF-F8gbsHt2.js", "/assets/context-DqGd4opN.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/signup": { "id": "routes/signup", "parentId": "root", "path": "signup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/signup-DxXrTYXk.js", "imports": ["/assets/with-props-BITBR5i4.js", "/assets/chunk-D4RADZKF-F8gbsHt2.js", "/assets/context-DqGd4opN.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/post-view": { "id": "routes/post-view", "parentId": "root", "path": "posts/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/post-view-BFj4wE4z.js", "imports": ["/assets/with-props-BITBR5i4.js", "/assets/chunk-D4RADZKF-F8gbsHt2.js", "/assets/context-DqGd4opN.js", "/assets/post-tiVzxYm2.js", "/assets/ava-C2JHgPho.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/new": { "id": "routes/new", "parentId": "root", "path": "new", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/new-GQfR5VUY.js", "imports": ["/assets/with-props-BITBR5i4.js", "/assets/chunk-D4RADZKF-F8gbsHt2.js", "/assets/context-DqGd4opN.js", "/assets/form-B96bbkt8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/edit": { "id": "routes/edit", "parentId": "root", "path": "edit/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/edit-DMgIaXlo.js", "imports": ["/assets/with-props-BITBR5i4.js", "/assets/chunk-D4RADZKF-F8gbsHt2.js", "/assets/context-DqGd4opN.js", "/assets/form-B96bbkt8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/users": { "id": "routes/users", "parentId": "root", "path": "users", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/users-Bida3_1-.js", "imports": ["/assets/with-props-BITBR5i4.js", "/assets/chunk-D4RADZKF-F8gbsHt2.js", "/assets/card-CeJAm_5I.js", "/assets/ava-C2JHgPho.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/user": { "id": "routes/user", "parentId": "root", "path": "users/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/user-CXUEue8E.js", "imports": ["/assets/with-props-BITBR5i4.js", "/assets/chunk-D4RADZKF-F8gbsHt2.js", "/assets/context-DqGd4opN.js", "/assets/card-CeJAm_5I.js", "/assets/post-tiVzxYm2.js", "/assets/ava-C2JHgPho.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-fb859968.js", "version": "fb859968", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/post-view": {
    id: "routes/post-view",
    parentId: "root",
    path: "posts/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/new": {
    id: "routes/new",
    parentId: "root",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/edit": {
    id: "routes/edit",
    parentId: "root",
    path: "edit/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/users": {
    id: "routes/users",
    parentId: "root",
    path: "users",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/user": {
    id: "routes/user",
    parentId: "root",
    path: "users/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
