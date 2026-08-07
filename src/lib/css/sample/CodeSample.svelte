<script lang="ts">
  import { Code } from "../css.svelte";

  const codeTs = "const foo=(bar:string):void=>{";
  const codePhp = "function foo(string bar):void{";
  const codePython = "def foo(self,bar:str)->list[str]:";
  const codeSql = "SELECT * FROM foo WHERE bar=?";
</script>

<h3>TypeScript</h3>
<Code code={codeTs} />

<h3>php</h3>
<Code lang="php" code={codePhp} />

<h3>python</h3>
<Code lang="php" code={codePython} />

<h3>SQL</h3>
<Code lang="sql" code={codeSql} />

<h3>view all supports</h3>
<Code lang="php" help={true} />
