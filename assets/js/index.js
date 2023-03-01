var docs = [
{{ range $index, $page := .Site.RegularPages -}}
    {
    id: {{ $index }},
    href: "{{ .RelPermalink | relURL }}",
    title: {{ .Title | jsonify }},
    description: {{ .Params.description | jsonify }},
    content: {{ .Content | jsonify }}
    },
{{ end -}}
];